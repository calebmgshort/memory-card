/* eslint-disable react/prop-types */
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import '../styles/Card.css'
import PokemonCard from './PokemonCard';

// eslint-disable-next-line no-unused-vars
function Cards({cards, handleClick}) {

  const cardElements = cards.map(card => {
    const onClick = handleClick(card.name)
    return (
      <Grid key={card.name} xs={2} onClick={onClick} className="card">
        <PokemonCard name={card.name} img={card.img} />
      </Grid>
    )
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {cardElements}
      </Grid>
    </Box>
  )
}

export default Cards