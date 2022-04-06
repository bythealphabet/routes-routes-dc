const routesToRemove = [
  // add here name of the routes you want to remove
];
const modsUrlsAndNames = [
  ////////EXPLANATION////////
  // {
  //   oldName: "foo",
  //   newName: "bar",
  // }
  // or URL path you want to change
  // {
  //   oldPath: "foo",
  //   newPath: "bar",
  // }
  /////////////////

  {
    oldName: "category___de",
    newName: "products___de",
  },
  {
    oldName: "category___en",
    newName: "products___en",
  },
  {
    oldPath: "/p/:id/:slug",
    newPath: "/product/:id/:slug",
  },
  {
    oldPath: "/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
    newPath: "/products/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
  },
];

const modsComponentsPaths = [
  ////////EXPLANATION////////
  // {
  //   component: "the rout name you want to change",
  //   newName: "the relative path of the new component",
  // }
  /////////////////
  {
    component: "Category",
    path: "../pages/Products.vue",
  },
  {
    component: "category",
    path: "../pages/Products.vue",
  },
];

export default function () {
  this.extendRoutes((routes, resolve) => {
    let newRoutes = [];
    newRoutes = removeRoutes(routes, routesToRemove);
    newRoutes = changeComponentPath({
      currentRoutes: newRoutes,
      routesToModify: modsComponentsPaths,
      resolve,
    });
    newRoutes = routesModifier({
      currentRoutes: newRoutes,
      routesToModify: modsUrlsAndNames,
      propertyToModify: "path",
    });
    newRoutes = routesModifier({
      currentRoutes: newRoutes,
      routesToModify: modsUrlsAndNames,
      propertyToModify: "name",
    });

    return newRoutes;
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function removeRoutes(routes = [], routesToRemove = []) {
  const newRoutes = routes.filter((route) => {
    return !routesToRemove.some((routeName) => route.name.includes(routeName));
  });
  return newRoutes;
}

function changeComponentPath({
  currentRoutes = [],
  routesToModify = [],
  resolve,
}) {
  return currentRoutes.map((route) => {
    const filtering = routesToModify.filter((mod) =>
      route.component.includes(mod.component)
    );

    if (filtering.length > 0) {
      const path = filtering[0].path;

      route.component = resolve(__dirname, path);
    }
    return route;
  });
}

function routesModifier({
  currentRoutes = [],
  routesToModify = [],
  propertyToModify = "name",
}) {
  let name = cap(propertyToModify);

  return currentRoutes.map((route) => {
    const modsToReplace = routesToModify.filter((mod) => {
      return route[propertyToModify].includes(mod[`old${name}`]);
    });

    if (modsToReplace.length > 0) {
      const newRoute = {
        ...route,
        [propertyToModify]: route[propertyToModify].replace(
          modsToReplace[0][`old${name}`],
          modsToReplace[0][`new${name}`]
        ),
      };

      return newRoute;
    }
    return route;
  });

  function cap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
