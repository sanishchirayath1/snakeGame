# snakeGame
<!-- https://pagespeed-insights.herokuapp.com/?url=https://sanishchirayath1.github.io/snakeGame/ -->
<!-- repo: https://github.com/ankurparihar/readme-pagespeed-insights -->
<p align="center">	<!-- (optional) center align -->
    <img href="https://pagespeed-insights.herokuapp.com/?url=https://sanishchirayath1.github.io/snakeGame/" src="download.svg" width="400px">
</p>

Game made to learn javascript
I made an intial array for the snake [2,1,0]
then added styling to it
after that i generated apple index with is exclusive to the numbers in the snake array

wrote a move function and gave it a time interval
decreased the time interval by a factor of 0.9 to increase the speed after each apple is eaten.

To find out whether the apple is eaten or not used a condtioanl statment where it checks if the sqare contains 
both snake and apple styling.Then removed the apple styling and added tail block to snake as well as generated another apple

incresed the score each time apple gets eaten and stored the score in local storage if the score is the new highscore
