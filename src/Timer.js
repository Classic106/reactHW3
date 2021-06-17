class TimerObj{
        
    #timer = null;
    #time = 0;

    constructor(time){
        this.#time = (!time) ? 0 : time;
    }
    set time(val){
        this.#time = val;
    }
    start(){
        console.log('start');
        this.#timer = setTimeout(()=>{
            console.log(this.#time-1);
            //setTime(time-10);
        }, 1000);
    }
    stop(){
        clearTimeout(this.#timer);
        this.#timer = null;
    }
    continue(){
        return this.#time;
    }
    TimeToString(val){
        //const days = Math.floor(val / (1000 * 60 * 60 * 24));
        const hours = Math.floor((val / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((val / 1000 / 60) % 60);
        const seconds = Math.floor((val / 1000) % 60);
        const miliseconds = Math.floor(val % 1000);
        
        const strHours = `${(new String(hours).length === 1) ? `0${hours}` : hours}`;
        const strMinutes = `${(new String(minutes).length === 1) ? `0${minutes}`: minutes}`;
        const strSeconds = `${(new String(seconds).length === 1) ? `0${seconds}`: seconds}`;
        const strMiliseconds = `${(new String(miliseconds).length === 1) ? `0${miliseconds}`: miliseconds}`;

        return `${strHours}:${strMinutes}:${strSeconds}:${strMiliseconds}`;
    }
    TimeToDigit(e){

        const time = e.target.value.split(':').reduce((acc, curval, index, arr)=>{
            
            if(arr.length === 1) return acc+(+curval * 3600);
            if(arr.length === 2) {
                if(index === 0) return acc+(+curval * 3600);
                if(index === 1) return acc+(+curval * 60);
            }
            if(arr.length === 3) {
                if(index === 0) return acc+(+curval * 3600);
                if(index === 1) return acc+(+curval * 60);
                if(index === 2) return acc+(+curval);
            }
        }, 0);

        return(time * 1000);
    }
}

export default new TimerObj()

//let [timer, setTimer] = useState(null);

    /*const CheckInput = (e)=>{
        console.log(e.target.value, e.target.name);
        if(timer !== null){
            clearTimeout(timer);
            timer = null;
            timer = setTimeout(()=>{
                console.log(e.target.value, e.target.name,1);
                clearTimeout(timer);
                setTimer(null);
            }, 1000);
        }else{
            clearTimeout(timer);
            timer = null;
            timer = setTimeout(()=>{  
                console.log(e.target.value, e.target.name,2);
                clearTimeout(timer);
                setTimer(null);
            }, 1000);
        }
    }*/