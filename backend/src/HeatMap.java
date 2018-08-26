import java.io.*;

public class HeatMap {

    public static final String DATA_FILE = "data.csv";

    HeatMap() {

    }

    /**
     *  Parse dataset
     */
    public void parse(File data) throws IOException {

        BufferedReader reader = new BufferedReader(new FileReader(data));

        String line;
        // read each line
        while ((line = reader.readLine()) != null) {

            // split line into tokens by whitespace regex, parse data
            String tokens[] = line.trim().split("\\s+");

        }

        reader.close();
    }



    public static void main(String[] args) {
        new HeatMap();
    }
}

class Crash{
    static void convertLatLong() {

    }
}
