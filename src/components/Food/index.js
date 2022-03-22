const Food =({coords})=>{
  const styles = {
    left:`${coords[0]}%`,
    top:`${coords[1]}%`
  }
  return (
      <div className='food' style={styles}/>
  )
}

export default Food