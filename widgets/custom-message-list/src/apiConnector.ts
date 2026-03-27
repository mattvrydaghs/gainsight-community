// Gainsight Community (inSided) API Connector
// Docs: https://api2-us-west-2.insided.com/docs/

// ─── Response Types ───────────────────────────────────────────────────────────

export interface TokenResponse {
  token_type: "bearer";
  access_token: string;
  expires_in: number; // seconds
}

export interface Author {
  id: string;
  username: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
}

export interface Conversation {
  id: string;
  publicId: string;
  title: string;
  content?: string;
  author: Author;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  viewCount: number;
  tags?: string[];
}

export interface Article {
  id: string;
  publicId: string;
  title: string;
  content?: string;
  author: Author;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  tags?: string[];
}

export interface Question {
  id: string;
  publicId: string;
  title: string;
  content?: string;
  author: Author;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  isAnswered: boolean;
  tags?: string[];
}

export interface Idea {
  id: string;
  publicId: string;
  title: string;
  content?: string;
  author: Author;
  category?: Category;
  createdAt: string;
  updatedAt: string;
  voteCount: number;
  status?: string;
  tags?: string[];
}

export interface Reply {
  id: string;
  publicReplyId: string;
  content: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  isAccepted?: boolean;
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export interface Space {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
}

// ─── Request Param Types ──────────────────────────────────────────────────────

export interface ListParams {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  tag?: string;
  authorId?: string;
  moderatorId?: string;
}

export interface WebhookSubscriptionPayload {
  url: string;
  username: string;
  secret: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────

export interface ApiConnectorConfig {
  /** Base URL of the community, e.g. "https://community.example.com" */
  baseUrl: string;
  /** OAuth2 client ID */
  clientId: string;
  /** OAuth2 client secret */
  clientSecret: string;
  /** Optional moderator user ID for admin operations */
  moderatorId?: string;
}

// ─── Main Class ───────────────────────────────────────────────────────────────

export class GainsightCommunityAPI {
  private baseUrl: string;
  private clientId: string;
  private clientSecret: string;
  private moderatorId?: string;

  private accessToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor(config: ApiConnectorConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.moderatorId = config.moderatorId;
  }

  // ─── Authentication ─────────────────────────────────────────────────────────

  /**
   * Fetches a new OAuth2 bearer token using client credentials flow.
   * POST /oauth2/token
   */
  async authenticate(): Promise<TokenResponse> {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const response = await fetch(`${this.baseUrl}/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const token: TokenResponse = await response.json();
    this.accessToken = token.access_token;
    this.tokenExpiresAt = Date.now() + token.expires_in * 1000 - 60_000; // 1 min buffer
    return token;
  }

  /** Returns a valid bearer token, re-authenticating if expired. */
  private async getToken(): Promise<string> {
    if (!this.accessToken || Date.now() >= this.tokenExpiresAt) {
      await this.authenticate();
    }
    return this.accessToken!;
  }

  // ─── Core Request Helper ────────────────────────────────────────────────────

  private async request<T>(
    path: string,
    options: RequestInit = {},
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    const token = await this.getToken();

    const url = new URL(`${this.baseUrl}${path}`);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) url.searchParams.set(key, String(value));
      }
    }

    if (this.moderatorId) {
      url.searchParams.set("moderatorId", this.moderatorId);
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`API error ${response.status} on ${path}: ${text}`);
    }

    return response.json() as Promise<T>;
  }

  // ─── Conversations ──────────────────────────────────────────────────────────

  /**
   * List conversations (community discussions).
   * GET /v2/conversations
   */
  async getConversations(params?: ListParams): Promise<PaginatedResponse<Conversation>> {
    return this.request<PaginatedResponse<Conversation>>("/v2/conversations", {}, {
      page: params?.page,
      pageSize: params?.pageSize,
      categoryId: params?.categoryId,
      tag: params?.tag,
      authorId: params?.authorId,
    });
  }

  /**
   * Get a single conversation by its private ID.
   * GET /v2/conversations/{id}
   */
  async getConversation(id: string): Promise<Conversation> {
    return this.request<Conversation>(`/v2/conversations/${id}`);
  }

  /**
   * Get replies for a conversation.
   * GET /v2/conversations/{id}/replies
   */
  async getConversationReplies(id: string, params?: ListParams): Promise<PaginatedResponse<Reply>> {
    return this.request<PaginatedResponse<Reply>>(`/v2/conversations/${id}/replies`, {}, {
      page: params?.page,
      pageSize: params?.pageSize,
    });
  }

  // ─── Articles ───────────────────────────────────────────────────────────────

  /**
   * List articles.
   * GET /v2/articles
   */
  async getArticles(params?: ListParams): Promise<PaginatedResponse<Article>> {
    return this.request<PaginatedResponse<Article>>("/v2/articles", {}, {
      page: params?.page,
      pageSize: params?.pageSize,
      categoryId: params?.categoryId,
      tag: params?.tag,
      authorId: params?.authorId,
    });
  }

  /**
   * Get a single article by its private ID.
   * GET /v2/articles/{id}
   */
  async getArticle(id: string): Promise<Article> {
    return this.request<Article>(`/v2/articles/${id}`);
  }

  /**
   * Get replies for an article.
   * GET /v2/articles/{id}/replies
   */
  async getArticleReplies(id: string, params?: ListParams): Promise<PaginatedResponse<Reply>> {
    return this.request<PaginatedResponse<Reply>>(`/v2/articles/${id}/replies`, {}, {
      page: params?.page,
      pageSize: params?.pageSize,
    });
  }

  // ─── Questions ──────────────────────────────────────────────────────────────

  /**
   * List questions.
   * GET /v2/questions
   */
  async getQuestions(params?: ListParams): Promise<PaginatedResponse<Question>> {
    return this.request<PaginatedResponse<Question>>("/v2/questions", {}, {
      page: params?.page,
      pageSize: params?.pageSize,
      categoryId: params?.categoryId,
      tag: params?.tag,
      authorId: params?.authorId,
    });
  }

  /**
   * Get a single question by its private ID.
   * GET /v2/questions/{id}
   */
  async getQuestion(id: string): Promise<Question> {
    return this.request<Question>(`/v2/questions/${id}`);
  }

  /**
   * Get replies for a question.
   * GET /v2/questions/{id}/replies
   */
  async getQuestionReplies(id: string, params?: ListParams): Promise<PaginatedResponse<Reply>> {
    return this.request<PaginatedResponse<Reply>>(`/v2/questions/${id}/replies`, {}, {
      page: params?.page,
      pageSize: params?.pageSize,
    });
  }

  // ─── Ideas ──────────────────────────────────────────────────────────────────

  /**
   * List ideas.
   * GET /v2/ideas
   */
  async getIdeas(params?: ListParams): Promise<PaginatedResponse<Idea>> {
    return this.request<PaginatedResponse<Idea>>("/v2/ideas", {}, {
      page: params?.page,
      pageSize: params?.pageSize,
      categoryId: params?.categoryId,
      tag: params?.tag,
      authorId: params?.authorId,
    });
  }

  /**
   * Get a single idea by its private ID.
   * GET /v2/ideas/{id}
   */
  async getIdea(id: string): Promise<Idea> {
    return this.request<Idea>(`/v2/ideas/${id}`);
  }

  /**
   * Get replies for an idea.
   * GET /v2/ideas/{id}/replies
   */
  async getIdeaReplies(id: string, params?: ListParams): Promise<PaginatedResponse<Reply>> {
    return this.request<PaginatedResponse<Reply>>(`/v2/ideas/${id}/replies`, {}, {
      page: params?.page,
      pageSize: params?.pageSize,
    });
  }

  // ─── Users ──────────────────────────────────────────────────────────────────

  /**
   * Get a user profile by ID.
   * GET /v2/users/{id}
   */
  async getUser(id: string): Promise<User> {
    return this.request<User>(`/v2/users/${id}`);
  }

  /**
   * List users.
   * GET /v2/users
   */
  async getUsers(params?: ListParams): Promise<PaginatedResponse<User>> {
    return this.request<PaginatedResponse<User>>("/v2/users", {}, {
      page: params?.page,
      pageSize: params?.pageSize,
    });
  }

  // ─── Spaces / Categories ────────────────────────────────────────────────────

  /**
   * List all spaces (top-level community spaces).
   * GET /v2/spaces
   */
  async getSpaces(): Promise<Space[]> {
    return this.request<Space[]>("/v2/spaces");
  }

  /**
   * Get a single space by ID.
   * GET /v2/spaces/{id}
   */
  async getSpace(id: string): Promise<Space> {
    return this.request<Space>(`/v2/spaces/${id}`);
  }

  /**
   * List all categories.
   * GET /v2/categories
   */
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>("/v2/categories");
  }

  /**
   * Get a single category by ID.
   * GET /v2/categories/{id}
   */
  async getCategory(id: string): Promise<Category> {
    return this.request<Category>(`/v2/categories/${id}`);
  }

  // ─── Webhooks ───────────────────────────────────────────────────────────────

  /**
   * Subscribe to a webhook event.
   * POST /webhooks/{eventName}/subscriptions
   *
   * Available eventNames include:
   *   article.Created, article.Published, article.Updated, article.Deleted
   *   conversation.Created, conversation.Updated, conversation.Deleted
   *   question.Asked, question.Answered, question.Updated, question.Deleted
   *   idea.Created, idea.Updated, idea.Deleted
   *   user.Created, user.Updated, user.Deleted
   *   group.Created, group.Updated, group.Deleted
   */
  async subscribeToWebhook(
    eventName: string,
    payload: WebhookSubscriptionPayload
  ): Promise<unknown> {
    return this.request<unknown>(
      `/webhooks/${encodeURIComponent(eventName)}/subscriptions`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  /**
   * List subscriptions for a webhook event.
   * GET /webhooks/{eventName}/subscriptions
   */
  async getWebhookSubscriptions(eventName: string): Promise<unknown[]> {
    return this.request<unknown[]>(
      `/webhooks/${encodeURIComponent(eventName)}/subscriptions`
    );
  }

  /**
   * Delete a webhook subscription.
   * DELETE /webhooks/{eventName}/subscriptions/{subscriptionId}
   */
  async deleteWebhookSubscription(
    eventName: string,
    subscriptionId: string
  ): Promise<void> {
    await this.request<void>(
      `/webhooks/${encodeURIComponent(eventName)}/subscriptions/${subscriptionId}`,
      { method: "DELETE" }
    );
  }

  // ─── Utility ─────────────────────────────────────────────────────────────────

  /**
   * Set a moderator ID to include on all subsequent requests.
   * This allows performing actions as a specific moderator user.
   */
  setModeratorId(moderatorId: string): void {
    this.moderatorId = moderatorId;
  }

  /** Clear the cached access token, forcing re-authentication on the next call. */
  clearToken(): void {
    this.accessToken = null;
    this.tokenExpiresAt = 0;
  }
}
