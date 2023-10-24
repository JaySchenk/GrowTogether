import { Box, Text } from "@mantine/core";

const PlantLibrary = () => {
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
        library
      </Text>
    </Box>
  );
};

export default PlantLibrary;