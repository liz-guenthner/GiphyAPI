Repo links:
https://liz-guenthner.github.io/GiphyAPI/
https://github.com/liz-guenthner/GiphyAPI

Resume links:
https://liz-guenthner.github.io/lizGuenthnerResume/
https://github.com/liz-guenthner/lizGuenthnerResume

Instructions:
1. Click a button to see 10 still images of gifs pulled from giphy api
2. Click on the still images to see gifs animate
3. Type in new categories in the input form
4. Click "submit" to see 10 new still images of gifs from giphy api
5. New category images will also animate when clicked
6. User can see rating, title and other info under each image

Problem:
1. How to grab data from third party API and return data to user.
2. How to create a new button when user suggests a new cartoon theme.
3. How to load still image of gif and then toggle animate gif by clicking on still image.

Solution/Technical Approach:
1. Add input field to capture user data to then dynamically create a button (jQuery) on the page with that input.
2. Onclick of any button will search https://api.giphy.com API for that subject and return data from nodes in returned JSON object (response).
3. Return 10 gifs and gif info, distributing them on page in an orderly set of columns and rows.
4. jQuery onclick event to switch out src tag of img data-attibute (data-still vs data-animate) for toggling of still image and animated gif.