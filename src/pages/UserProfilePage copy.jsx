import { Box, Text } from "@mantine/core";
import NavbarMobile from "../components/NavbarMobile";

const UserProfilePage = () => {
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
        Here you will see all information that's linked to your UserId
      </Text>
      <NavbarMobile/>
    </Box>
  );
};

export default UserProfilePage;
