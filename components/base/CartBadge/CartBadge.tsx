import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@material-ui/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { METALLIC_SUNBURST, PURE_WHITE } from "../../../src/colors";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: METALLIC_SUNBURST,
    color: PURE_WHITE,
  },
}));

interface Props {
  count: number;
}

const CartBadge: React.FC<Props> = ({ count = 0 }) => {
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={count}>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
};

export default CartBadge;
