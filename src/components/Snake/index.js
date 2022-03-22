const Snake = ({snakeBody}) => {
  return (<>
    {snakeBody.map((part, i) => {
      const styles = {
        left: `${part[0]}%`,
        top: `${part[1]}%`
      }
      return (
          <div className='snake-part' key={i} style={styles}/>
      )
    })}
  </>)
}

export default Snake