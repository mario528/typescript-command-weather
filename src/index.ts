import commader from "commander"
import axios, { AxiosResponse } from "axios"
import colors from "colors"
import Config from "./config/config";
import Url from "./util/url";
const log = console.log;
interface ILive {
        province: string;
        city: string;
        adcode: string;
        weather: string;
        temperature: string;
        winddirection: string;
        windpower: string;
        humidity: string;
        reporttime: string;
}
interface IWeatherResponse {
        status: string;
        count: string;
        info: string;
        infocode: string;
        lives: ILive[];
}
commader.version('1.0.0')
        .option("-c --city [cityName]", "Enter the city for the weather query")
        .option("-t --query-type", "Entery query weather type")
        .parse(process.argv);
if (process.argv.slice(2).length === 0) {
        commader.outputHelp();
        process.exit();
}
axios.get(`${Url.baseUrl}?city=${encodeURI(commader.city)}&key=${Config.KEY}&extensions=${encodeURI(commader.queryType ? "base" : "all")}`).then((res: AxiosResponse<IWeatherResponse>) => {
        if (res.data.status === "1") {
                let { city, weather, temperature, winddirection, windpower, reporttime } = res.data.lives[0];
                log(colors.green("天气查询成功 :)"));
                log(colors.green(`${city}`));
                log(colors.green(`天气: ${weather}, 温度${+temperature}度`));
                log(colors.green(`${winddirection}风${windpower}级`));
                log(colors.green(`${reporttime}`));
        } else {
                log(colors.red("opps~ 天气查询失败 :("))
        }
}).catch(() => {
        log(colors.red("opps~ 天气查询失败 :("));
});