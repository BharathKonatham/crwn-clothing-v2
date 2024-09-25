//bundle.js:96731  Selector selectCategoriesMap returned a different result when called with the same parameters. 
//This can lead to unnecessary rerenders. 
//The selector selectCategoriesMap is returning a new object or array on every call. 
// When Redux notices that the reference to this object or array changes 
// (even if the contents are the same), it triggers a re-render. 
// To prevent this, you need to memoize the result of the selector so it only returns a 
// new object or array when its input parameters change.


//SolutionMemoizing the selector using reselect ensures that if the input to the selector hasn't changed, 
//the selector returns the previously computed result, preventing unnecessary re-renders.
// createSelector from reselect memoizes the result of the selector.
// If the categories data hasn't changed, createSelector will return the previous result, 
// avoiding the creation of a new object and thus preventing unnecessary re-renders.

// export const selectCategoriesMap = (state)=>{
//     console.log('selector fired')
//     return state.categories.categories.reduce((acc,category)=>{
//     const { title ,items} = category
//     acc[title.toLowerCase()] = items
//     return acc
//   },{})

// }

// the above code 

import { createSelector } from 'reselect';

// Assuming the `categories` data comes from state
const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector([selectCategoryReducer],(categoriesSlice)=>categoriesSlice.categories) 

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log(categories)
    return categories.reduce((acc, category) => {
      acc[category.title.toLowerCase()] = category.items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector([selectCategoryReducer],(categorieSlice)=> categorieSlice.isLoading)
