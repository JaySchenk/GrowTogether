import {
  Box,
  Button,
  Select,
  Text,
  TextInput,
  Checkbox,
  DateInput,
} from "@mantine/core";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../contexts/SessionContext";

const NewUserPlant = () => {
  const [plants, setPlants] = useState();
  const [plantName, setPlantName] = useState();
  const [plantSpecies, setPlantSpecies] = useState();
  const [plantPicture, setPlantPicture] = useState();
  const [plantCutting, setPlantCutting] = useState(0);
  const [plantSize, setPlantSize] = useState();
  const [product, setProduct] = useState();
  const [productUsedDate, setProductUsedDate] = useState();
  const [activity, setActivity] = useState();
  const [activityDate, setActivityDate] = useState();
  const [reminderSettings, setReminderSettings] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      plantname: plantName,
      plantSpecies: plantSpecies,
      plantPicture,
      plantCutting: plantCutting,
      plantSize: plantSize,
      productsUsed: [
        {
          product: product,
          dateUsed: productUsedDate ? new Date(productUsedDate) : new Date(),
        },
      ],
      careActivityDate: [
        {
          activity: activity,
          dateOfCare: activityDate ? new Date(activityDate) : new Date(),
        },
      ],
      reminderSettings: reminderSettings,
    };
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined || payload[key] === null) {
        delete payload[key];
      }
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/userplants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 201) {
        const parsed = await response.json();
        console.log(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/plantcare`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlants(data);
        console.log(data);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <Box
      sx={{
        margin: "0 auto",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "calc(100vh - 100px)",
      }}
    >
      {" "}
      {plants ? (
        <>
          <Text align="center" size="xl" weight="bold">
            New plant
          </Text>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "2rem",
            }}
            onSubmit={handleSubmit}
          >
            <TextInput
              value={plantName}
              onChange={(event) => setPlantName(event.target.value)}
              required
              label="Plant name"
              variant="filled"
              withAsterisk
            />
            <Select
              label="Plant species"
              placeholder="Pick value"
              data={plants.map((item) => ({
                label: item.species,
                value: item._id,
              }))}
              onChange={(event) => setPlantSpecies(event.target.value)}
            />
            <TextInput
              value={plantPicture}
              onChange={(event) => setPlantPicture(event.target.value)}
              required
              label="Picture of plant"
              variant="filled"
              withAsterisk
            />
            <TextInput
              value={plantCutting}
              onChange={(event) => setPlantCutting(event.target.value)}
              required
              label="Plant cuttings available"
              variant="filled"
              withAsterisk
            />
            <TextInput
              value={plantSize}
              onChange={(event) => setPlantSize(event.target.value)}
              required
              label="Plant size"
              variant="filled"
              withAsterisk
            />
            <TextInput
              value={product}
              onChange={(event) => setProduct(event.target.value)}
              label="Product's used on plant"
              variant="filled"
            />
            <TextInput
              value={productUsedDate}
              onChange={(event) => setProductUsedDate(event.target.value)}
              required
              label="Date of using products"
              variant="filled"
              withAsterisk
            />
            <TextInput
              value={activity}
              onChange={(event) => setActivity(event.target.value)}
              required
              label="Plant care acitivty"
              variant="filled"
              withAsterisk
            />
            <DateInput
              valueFormat="YYYY MMM DD"
              label="Plant care activity date"
              placeholder="Date input"
              onChange={(event) => setActivityDate(event.target.value)}
            />
            ;
            <TextInput
              value={activityDate}
              onChange={(event) => setActivityDate(event.target.value)}
              required
              label="Plant care activity date"
              variant="filled"
              withAsterisk
            />
            <Checkbox
              defaultChecked
              labelPosition="left"
              onChange={(event) => setReminderSettings(event.target.checked)}
              label="I want to receive plantcare reminders"
            />
            <Button
              type="submit"
              variant="filled"
              color="cyan"
              sx={{ marginTop: "1rem", alignSelf: "center" }}
            >
              Make Plant
            </Button>
          </Box>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
};

export default NewUserPlant;
