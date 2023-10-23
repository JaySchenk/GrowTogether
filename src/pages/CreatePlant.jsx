import { Box, Text } from "@mantine/core";

const CreatePlant = () => {
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
        Here you can create a plant that will be linked to your userId
      </Text>
    </Box>
  );
};

export default CreatePlant;
