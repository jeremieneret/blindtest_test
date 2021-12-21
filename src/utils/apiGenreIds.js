// the integers of the array are the ids of a selection of genres in Deezer Api
const apiGenreIds = [85, 152, 466, 129, 98, 169, 2, 12, 16, 75, 81, 116, 113]
// we will use them as id for our fetches, randomly, thanks to the function below
export const shuffledApiGenreIds = apiGenreIds.sort(() => Math.random() - 0.5)