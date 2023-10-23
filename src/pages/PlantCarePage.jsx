import { Box, Text } from "@mantine/core";

const PlantCarePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
      }}
    >
      <Text size="xl" weight="bold" align="center">
        Here you will see detailed information about the plant you clicked on.
      </Text>
    </Box>
  );
};

export default PlantCarePage;
