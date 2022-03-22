import React, {useState, useEffect, useRef} from "react";
import "./styles.css";
import {DIRECTIONS} from "./configs/directions";
import {getRandomCoords} from "./utils";

import Snake from "./components/Snake";
import Food from "./components/Food";

function App() {
  const [snakeBody, setSnakeBody] = useState([[0, 0], [2, 0]])
  const [foodCoord, setFoodCoord] = useState([])
  const [direction, setDirection] = useState("RIGHT")
  const [speed, setSpeed] = useState(200)


  const directionRef = useRef(direction)
  const snakeBodyRef = useRef(snakeBody)



  const onKeyDown = ({keyCode}) => {
    switch (keyCode) {
      case 38: {
        setDirection(DIRECTIONS.UP)
        break;
      }
      case 40: {
        setDirection(DIRECTIONS.DOWN)
        break;
      }
      case 37: {
        setDirection(DIRECTIONS.LEFT)
        break
      }
      case 39: {
        setDirection(DIRECTIONS.RIGHT)
        break
      }
    }
  }



  const moveSnake = () => {
    let body = [...snakeBodyRef.current]
    let head = body[body.length - 1]

    switch (directionRef.current) {
      case "RIGHT":
        head = [head[0] + 2, head[1]]
        break
      case "LEFT":
        head = [head[0] - 2, head[1]]
        break
      case "UP":
        head = [head[0], head[1] - 2]
        break
      case "DOWN":
        head = [head[0], head[1] + 2]
    }
    body.push(head)
    body.shift()
    setSnakeBody([...body])
  }

  const gameOver = () => {
    setSnakeBody([[0, 0], [2, 0]])
    setSpeed(200)
    setDirection(DIRECTIONS.RIGHT)
    alert(`gameover,your snake is ${snakeBody.length}`);
  }


  const checkIfSnakeEat = () => {
    let head = snakeBody[snakeBody.length - 1];
    let food = foodCoord;
    if (head[0] == food[0] && head[1] == food[1]) {
      setFoodCoord(getRandomCoords)
      enlargeSnake();
      speedUP();
    }
  }

  const checkIfSnakeEatItself = () => {
    let snake = [...snakeBody];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        gameOver();
      }
    })
  }


  const enlargeSnake = () => {
    let newSnake = [...snakeBody];
    newSnake.unshift([])
    setSnakeBody(newSnake)
  }

  const speedUP = () => {
    if (speed >= 10) {
      setSpeed((prev) => prev - 10)
    }
  }

  const isSnakeOfTheField = () => {
    let head = snakeBody[snakeBody.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      gameOver()

    }
  }

  useEffect(() => {
    snakeBodyRef.current = snakeBody
    directionRef.current = direction
  })

  useEffect(() => {
    isSnakeOfTheField()
    checkIfSnakeEatItself()
    checkIfSnakeEat()
  }, [snakeBody])


  useEffect(() => {
    document.onkeydown = onKeyDown;
    setFoodCoord(getRandomCoords);
    setInterval(moveSnake, speed)
  }, [])


  return (
      <div className="game-field">
        <Snake snakeBody={snakeBody}/>
        <Food coords={foodCoord}/>
      </div>
  )
}

export default App;
