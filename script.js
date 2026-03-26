import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

public class WeatherApp {

    // Replace with your API key
    private static final String API_KEY = "YOUR_API_KEY";
    
    public static void main(String[] args) {
        String city = "Nagpur";  // Change city if needed
        
        try {
            // API URL
            String urlString = "https://api.openweathermap.org/data/2.5/weather?q="
                    + city + "&appid=" + API_KEY + "&units=metric";

            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // Set request method
            conn.setRequestMethod("GET");

            int responseCode = conn.getResponseCode();

            if (responseCode == 200) {
                // Read response
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(conn.getInputStream())
                );

                StringBuilder response = new StringBuilder();
                String line;

                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                // Parse JSON
                parseAndDisplay(response.toString());

            } else {
                System.out.println("Error: HTTP Response Code " + responseCode);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Method to parse JSON and display data
    private static void parseAndDisplay(String jsonData) {
        JSONObject obj = new JSONObject(jsonData);

        String cityName = obj.getString("name");
        JSONObject main = obj.getJSONObject("main");
        JSONObject weather = obj.getJSONArray("weather").getJSONObject(0);

        double temperature = main.getDouble("temp");
        double humidity = main.getDouble("humidity");
        String description = weather.getString("description");

        // Structured Output
        System.out.println("===== WEATHER REPORT =====");
        System.out.println("City        : " + cityName);
        System.out.println("Temperature : " + temperature + " °C");
        System.out.println("Humidity    : " + humidity + " %");
        System.out.println("Condition   : " + description);
        System.out.println("==========================");
    }
}
