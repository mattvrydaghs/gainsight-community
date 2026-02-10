interface CommunityCategory {
  id: number
  title: string
  parentId?: number | null
  url: string
  isContainer: boolean
  visibleTopicsCount: number
  children: Array<CommunityCategoryChild>
  [x: string | number | symbol]: unknown
}
type CommunityCategoryChild = CommunityCategory & { children: Array<CommunityCategoryChild> }

interface NavItem {
  key: string
  visibility: boolean
  name: string
  url?: string
}
interface MegaMenu {
  communityCategoriesV2: Array<CommunityCategory>
  items: Array<NavItem>

}

function getNav(): MegaMenu {
  const currentMode = import.meta.env.MODE;
  if (currentMode === "development") {
    return {
      communityCategoriesV2: [
        {
          id: 1,
          title: "Category 1",
          parentId: null,
          url: "/category-1",
          isContainer: true,
          visibleTopicsCount: 5,
          children: [
            {
              id: 11,
              title: "Subcategory 1-1",
              parentId: 1,
              url: "/category-1/subcategory-1",
              isContainer: false,
              visibleTopicsCount: 2,
              children: []
            }
          ]
        },
        {
          id: 2,
          title: "Category 2",
          parentId: null,
          url: "/category-2",
          isContainer: false,
          visibleTopicsCount: 3,
          children: []
        }
      ],
      items: [
        { key: "home", visibility: true, name: "Home", url: "/" },
        { key: "about", visibility: true, name: "About", url: "/about" },
        { key: "contact", visibility: false, name: "Contact", url: "/contact" }
      ]
    };
  } else {
    // In production, fetch the actual navigation data from the server
    const element = document.querySelector("[data-preact='mega-menu/index']");
    if (element) {
      const dataPropsAttr = element.getAttribute("data-props");
      if (dataPropsAttr) {
        return JSON.parse(dataPropsAttr);
      }
    }
    return {
      communityCategoriesV2: [],
      items: []
    };
  }
}

const TileItem = (category: CommunityCategory) => {
  return (
    <div className="tile-item">
      <h3>{category.title}</h3>
      <p>{category.visibleTopicsCount} topics</p>
    </div>
  );
}

export function App() {
  const nav: MegaMenu = getNav();
  return (
    nav.communityCategoriesV2.map(category => (
      <TileItem key={category.id} {...category} />
    ))
  );
}