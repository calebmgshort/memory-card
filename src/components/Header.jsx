// eslint-disable-next-line react/prop-types
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
function Header({score, bestScore}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>Pokemon Memory Game</h1>
      <p>Get points by clicking on an image but don&apos;t click on any more than once!</p>
      <p>Score: {score}</p>
      <p>Best Score: {bestScore}</p>
    </Box>
  )
}

export default Header