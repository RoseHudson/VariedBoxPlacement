import few from '../assets/fewCandles.png';
import some from '../assets/someCandles.png';
import many from '../assets/manyCandles.png';

export default function Result({age, unit}) {
    function chooseCake(age){
        if (age < 100){
            return few;
        }
        else if (age < 10000){
            return some;
        }
        else {
            return many;
        }
    }
    return(
        <div>
            <h2>You are {age} {unit} old!</h2>
        <img src={chooseCake(age)} alt="A birthday cake with a few candles" />
        </div>
    )
}