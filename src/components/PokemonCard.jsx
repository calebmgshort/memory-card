// eslint-disable-next-line react/prop-types
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
function PokemonCard({name, img}) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PokemonCard