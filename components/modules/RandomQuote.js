import React from "react";

const RandomQuote = ({ type, className }) => {

    const zen = [
        <>"Wherever you are is where your mind should be."<br/>- Gran Master Wei Chueh</>,
        <>"The world is ruled by letting things take their course."<br/>- Lao Tzu</>,
        <>"The most wasted of days is one without laughter."<br/>- E. E. Cummings</>,
        <>"Do not let what you can't do interfere with what you can do."<br/>- John Wooden</>,
        <>"A smile is your greatest social asset."<br/>- Zig Ziglar</>,
        <>"What seems to us as bitter trials are often blessings in disguise."<br/>- Oscar Wilde</>,
        <>"Don't walk Behind me; I may not lead.<br/>
        Don't walk in Front of me; I may not follow.<br/>
        Just walk beside me and be my Friend."<br/>
        - Albert Camus</>,
        <>"A flower falls even though we love it; and a weed grows even though we don't love it."<br/>- Dogen Zenji</>,
        <>"Act as if what you do makes a difference, it does."<br/>- William James</>,
        <>"What we fear of doing most is usually what we most need do."<br/>- Ralph Waldo Emerson</>,
        <>"We grow because we struggle, we learn and overcome." <br/>- R.C. Allen</>,
        <>"Great acts are made of small deeds."<br/>- Lao Tzu</>
    ];
    const mottos = [
        <>"Sustainability, Diversity, Creativity"</>,
        <>"SUSTAINABILITY with the ability to SUSTAIN"</>
    ];
    const locationError = [
        <>"I have never been lost, but I will admit to being confused for several weeks."<br/>- Daniel Boone</>,
        <>"Lost time is never found again."<br/>- Benjamin Franklin</>,
        <>"Not all those who wander are lost."<br/>- J. R. R. Tolkien</>,
        <>"Not until we are lost do we begin to find ourselves."<br/>- Henry David Thoreau</>,
        <>"I lost some time once. It's always in the last place you look."<br/>- Neil Gaiman</>,
        <>"The only paridise is paradise lost."<br/>- Marcel Proust</>,
        <>"You are lost the moment you know what the result will be."<br/>- Juan Gris</>,
        <>"We lost because we told ourselves we lost."<br/>- Leo Tolstoy</>,
        <>"Things are fluid in this world, and if you don't remain fluid, you get lost in the sauce."
        <br/>- Talib Kweli</>,
        <>"The art of losing isn't hard to master; so many things seem filled with the intent to be
        lost that their loss is no disaster."<br/>- Elizabeth Bishop</>,
        <>"If at first you don't succeed... then dust yourself off and try again"<br/>- Aaliyah</>,
        <>In three words I can sum up everything I've learned about life: It Goes On.<br/>- Robert Frost</>
        
    ];
    const rapQuotes = [
        <>"You've got enemies? Good, that means you actually stood up for something."<br/>- Eminem</>,
        <>"Behind me is infinite power. Before me is endless possibility, around me is boundless opportunity.
        My strength is mental, physical, and spiritual"
        <br/>- 50 Cent</>,
        <>"Good things come in good time"<br/>- Wiz Khalifa</>,
        // <>"Remind yourself, nobody is built like you. You design yourself."<br/>- Jay-Z</>,
        <>"May the best of your todays be the worst of your tomorrows."<br/>- Jay-Z</>,
        <>"Even though you're fed up, you got to keep ya head up."<br/>- Tupac Shakur</>,
        <>"They're gonna try to tell you no, shatter all your dreams. But you gotta get up and go and think
        of better things. "<br/>- Mac Miller</>,
        <>"You might not have a car or big gold chain, stay true to yourself and things will change."
        <br/>- Snoop Dogg</>,
        <>"We ain't picture perfect but we worth the picture still."<br/>- J. Cole</>,
        <>"We can’t change the world until we change ourselves."<br/>- The Notorious B.I.G.</>,
        <>"Being happy is the goal... but greatness is my mission."<br/>- Childish Gambino</>
    ]

    let output;
    
    if (type === "zen") {
        output = zen;
    } else if (type === "mottos") {
        output = mottos;
    } else if (type === "locationError") {
        output = locationError;
    } else if (type === "rap") {
        output = rapQuotes;
    } else {
        output = ""
    }
    
    const select = (el) => {
        let n = Math.floor(Math.random()*el.length);
        return el[n];
    }
    const quote = select(output);

    return (<div className={className?"quote "+className:"quote"}>{quote}</div>)
}

export default RandomQuote;