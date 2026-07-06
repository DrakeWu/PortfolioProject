import { createInterface } from 'node:readline/promises';
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

async function prompt() {
  const answer = await rl.question('Are you on a weekly meal plan? (yes/no) ');
    if (answer.toLowerCase() === 'yes') {
      await weeklyMealPlan();
    } else if (answer.toLowerCase() === 'no') {
      const answer2 = await rl.question('Are you on a semester meal plan? (yes/no) ');
        if (answer2.toLowerCase() === 'yes') {
          await semesterMealPlan();
        } else {
          console.log('You are not on a meal plan.');
          rl.close();
        }
      }; 
      rl.close();
    }




async function semesterMealPlan() {
  const mbleft = await rl.question('How many meal swipes do you have left?(0-400) ');

  const weeksleft = await rl.question('How many weeks are left in the semester?(0-16) ');

  const msperweek = calculateMealSwipesPerWeek( mbleft, weeksleft);
  console.log(`For the remaining weeks in the semester, you should use ${msperweek} meal swipes.`);
  const remainder2 = remaindercalculator2(mbleft, weeksleft);
  console.log(`You will have ${remainder2} meal swipes left over.`);
  rl.close(); // After last question

}
async function weeklyMealPlan() {
  const msleft = await rl.question('How many meal swipes do you have left?(0-21)');
  
  const daysleft = await rl.question('How many days are left in the week?(0-7)');
  
  console.log(msleft);
  // console.log(msperday);
  console.log(daysleft);

  const msperday = calculateMealSwipesPerDay( msleft, daysleft);
  console.log(`For the remaining days in the week, you should use ${msperday} meal swipes.`);
  const remainder = remaindercalculator(msleft, daysleft);
  console.log(`You will have ${remainder} meal swipes left over.`);
  rl.close(); // After last question
}

function calculateMealSwipesPerDay (msleft, daysleft) {
  const msperday = Math.floor(msleft / daysleft);
  return msperday;
}

function remaindercalculator (msleft, daysleft) {
  const remainder = msleft % daysleft;
  return remainder;
}

function calculateMealSwipesPerWeek (mbleft, weeksleft) {
  const msperweek = Math.floor(mbleft / weeksleft);
  return msperweek;
}

function remaindercalculator2 (mbleft, weeksleft) {
  const remainder2 = mbleft % weeksleft;
  return remainder2;
}

prompt();
