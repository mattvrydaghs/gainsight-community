import { useState, useEffect, useCallback } from "react";
import type { GainsightCommunityAPI, Conversation } from "./apiConnector";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MessageListProps {
  api: GainsightCommunityAPI;
  pageSize?: number;
  categoryId?: string;
  title?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function initials(username: string): string {
  return username
    .split(/[\s._-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

// Deterministic hue from a username string for avatar bg colour
function avatarHue(username: string): number {
  let hash = 0;
  for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <li className="ml-card ml-card--skeleton" aria-hidden="true">
      <div className="ml-card__avatar ml-skeleton" />
      <div className="ml-card__body">
        <div className="ml-skeleton ml-skeleton--title" />
        <div className="ml-skeleton ml-skeleton--meta" />
      </div>
    </li>
  );
}

function ConversationCard({ item }: { item: Conversation }) {
  const hue = avatarHue(item.author.username);
  return (
    <li className="ml-card">
      {item.author.avatar ? (
        <img
          className="ml-card__avatar"
          src={item.author.avatar}
          alt={item.author.username}
          loading="lazy"
        />
      ) : (
        <div
          className="ml-card__avatar ml-card__avatar--initials"
          style={{ background: `hsl(${hue},55%,48%)` }}
          aria-label={item.author.username}
        >
          {initials(item.author.username)}
        </div>
      )}

      <div className="ml-card__body">
        <p className="ml-card__title">{item.title}</p>

        <div className="ml-card__meta">
          <span className="ml-card__author">{item.author.username}</span>
          <span className="ml-card__dot" aria-hidden="true">·</span>
          <time
            className="ml-card__time"
            dateTime={item.updatedAt}
            title={new Date(item.updatedAt).toLocaleString()}
          >
            {timeAgo(item.updatedAt)}
          </time>

          {item.category?.name && (
            <>
              <span className="ml-card__dot" aria-hidden="true">·</span>
              <span className="ml-card__tag">{item.category.name}</span>
            </>
          )}
        </div>
      </div>

      <div className="ml-card__stats">
        <span className="ml-card__stat" title="Replies">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 3V3a1 1 0 0 1 1-1z" />
          </svg>
          {item.replyCount}
        </span>
        {item.viewCount > 0 && (
          <span className="ml-card__stat" title="Views">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 3C4 3 1 8 1 8s3 5 7 5 7-5 7-5-3-5-7-5zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            {item.viewCount}
          </span>
        )}
      </div>
    </li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MessageList({ api, pageSize = 8, categoryId, title }: MessageListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchConversations = useCallback(
    async (targetPage: number, append = false) => {
      setLoading(true);
      setError(null);
      try {
        const result = await api.getConversations({
          page: targetPage,
          pageSize,
          categoryId,
        });
        setConversations((prev) => (append ? [...prev, ...result.data] : result.data));
        setTotal(result.total);
        setHasMore(targetPage * pageSize < result.total);
        setPage(targetPage);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load conversations.");
      } finally {
        setLoading(false);
      }
    },
    [api, pageSize, categoryId]
  );

  useEffect(() => {
    fetchConversations(1);
  }, [fetchConversations]);

  const handleLoadMore = () => fetchConversations(page + 1, true);
  const handleRetry = () => fetchConversations(1);

  const skeletonCount = Math.min(pageSize, 5);

  return (
    <div className="ml-root">
      {/* Header */}
      <div className="ml-header">
        <span className="ml-header__title">{title ?? "Recent Conversations"}</span>
        {total > 0 && !loading && (
          <span className="ml-header__count">{total.toLocaleString()}</span>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="ml-error" role="alert">
          <span>{error}</span>
          <button className="ml-btn ml-btn--ghost" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {/* List */}
      <ul className="ml-list" role="list">
        {loading && conversations.length === 0
          ? Array.from({ length: skeletonCount }, (_, i) => <SkeletonCard key={i} />)
          : conversations.map((item) => <ConversationCard key={item.id} item={item} />)}
      </ul>

      {/* Empty state */}
      {!loading && !error && conversations.length === 0 && (
        <div className="ml-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p>No conversations yet.</p>
        </div>
      )}

      {/* Load more */}
      {hasMore && !error && (
        <div className="ml-footer">
          <button
            className="ml-btn ml-btn--primary"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? <span className="ml-spinner" aria-hidden="true" /> : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
