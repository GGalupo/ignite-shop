import { styled } from "../styles";

const Button = styled("button", {
  backgroundColor: "$green500",
  borderRadius: 8,
  border: 0,
  padding: "0.25rem 0.5rem",

  span: {
    fontWeight: "bold",
  },

  "&:hover": {
    filter: "brightness(0.8)",
  },
});

export default function Home() {
  return (
    <Button>
      <span>test text </span>
      Submit
    </Button>
  );
}
