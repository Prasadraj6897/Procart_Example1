import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image1 from '../../assets/Images/Mobiles/apple-iphone-5s-ofic1.jpg'

let Mobiles = () => {

    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
          marginTop:10,
          marginLeft:10,
        //   backgroundColor:'green'
        },
        media: {
          height: 140,
        },
        fullContent:{
            maxWidth: '100px',
            height: '100px',
            // img

        }
      });

    const classes = useStyles();
    return(
        <Card className={classes.root} >
            <CardActionArea>
                <div class="view zoom overlay">
                    <CardMedia
                        className={classes.media}
                        image={Image1}
                        title="Contemplative Reptile"
                    />
                    <div class="mask">
                        {/* <img class="img-fluid w-100"
                            src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/13.jpg"/> */}
                        <CardMedia
                                
                                className={classes.fullContent}
                                image={Image1}
                                title="Contemplative Reptile"
                            />

                        <div class="mask rgba-black-slight"></div>
                    </div>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    <ul className="rating">
                        
                            <i class="fas fa-star fa-sm text-primary"></i>
                       
                            <i class="fas fa-star fa-sm text-primary"></i>
                        
                            <i class="fas fa-star fa-sm text-primary"></i>
                        
                            <i class="fas fa-star fa-sm text-primary"></i>
                        
                            <i class="far fa-star fa-sm text-primary"></i>
                        
                        </ul>
                        <hr></hr>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <h6 class="mb-3">
                    <span class="text-danger mr-1">$12.99</span>
                    <span class="text-grey"><s>$36.99</s></span>
                </h6>
                <br></br>
                
                <Button type="button" class="btn btn-primary btn-sm mr-1 mb-2">
                        <i class="fas fa-shopping-cart pr-2"></i>Add to cart
                </Button>
                <Button type="button" class="btn btn-light btn-sm mr-1 mb-2">
                    <i class="fas fa-info-circle pr-2"></i>Details
                </Button>
                <Button type="button" class="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to wishlist">
                    <i class="far fa-heart"></i>
                </Button>
            </CardActions>
        </Card>
    )
}

export default Mobiles;