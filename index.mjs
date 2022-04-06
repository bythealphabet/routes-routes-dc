console.clear();

console.log("");
console.log("");
console.log("");
console.log(
  "////////////////****************** Before Changing Routes ******************////////////////"
);
console.log("");
console.log("");
console.log("");

import { routes } from "./route.mjs";

console.log("ROUTES", routes);

console.log("");
console.log("");
console.log("");
console.log(
  "////////////////****************** After Changing Routes ******************////////////////"
);
console.log("");
console.log("");
console.log("");

const routesToRemove = ["Category___", "Product___"];
const pathsToReplace = [
  {
    oldPath: "/p/:id/:slug",
    newPath: "/product/:id/:slug",
  },
  {
    oldPath: "/de/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
    newPath: "/categories/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
  },
  {
    oldPath: "/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
    newPath: "/categories/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?",
  },
];

const namesToReplace = [
  {
    oldName: "___de",
    newName: "___KORSOU",
  },
];

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function routesModifier(
  currentRoute = [],
  routesToModify = [],
  propertyToModify = "name"
) {
  let name = cap(propertyToModify);
  return currentRoute.map((route) => {
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

let newRoutes = [];

newRoutes = routesModifier(routes, pathsToReplace, "path");
newRoutes = routesModifier(newRoutes, namesToReplace, "name");

console.log("New ROUTES", newRoutes);
