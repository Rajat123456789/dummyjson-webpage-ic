import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useState } from "react";
import BasicRating from "./Rating";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link } from "react-router-dom";

export default function SmallCard({
  item,
  handleClick,
  handlePdp,
}) {
  const { title, description, price, thumbnail, rating } = item;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <Card sx={{ maxWidth: 330, marginRight: "auto", marginTop: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#4d6fc4" }} aria-label="recipe">
            RJT
          </Avatar>
        }
        title={title}
        subheader={<BasicRating rating={rating} />}
      />
      <Link to={`/`}>
        <CardMedia
          component="img"
          height="194"
          image={thumbnail}
          alt="Paella dish"
          onClick={(e) => handlePdp(e, item)}
        />
      </Link>
      <CardContent>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontSize: 17, marginBottom: 1 }}
        >
          {"$ " + price + " "}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <LoadingButton
          variant="outlined"
          sx={{
            marginTop: "auto",
            color: "#4d6fc4",
            borderColor: "#4d5fc4",
            outlineColor: "#4d7fc6",
          }}
          fullWidth
          className="add-to-cart"
          onClick={(e) => handleClick(e, item)}
        >
          ADD TO CART
        </LoadingButton>
      </CardActions>
    </Card>
  );
}
