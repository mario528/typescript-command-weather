import commader from 'commander'
import axios, { AxiosResponse } from "axios"
import colors from 'colors'
import Config from './config/config'
import Url from './util/url'

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
        .parse(process.argv);
if (commader.city) {
        axios.get(`${Url.baseUrl}?city=${commader.city}&key=${Config.KEY}`).then((res: AxiosResponse<IWeatherResponse>) => {
                console.log(res.data)
                if (res.data.status == '1') {
                        log(colors.green('天气查询成功 :)'))
                }else {
                        log(colors.red('opps~ 天气查询失败 :('))
                }
        })
}