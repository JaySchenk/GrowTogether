import { Box, Text } from "@mantine/core";
import NavbarMobile from "../components/NavbarMobile";

const UserPlantPage = () => {
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
        Here you will see cards of all the plant's you've got and option to add
        new plant.
      </Text>
      <NavbarMobile/>
    </Box>
  );
};

export default UserPlantPage;
