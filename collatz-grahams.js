// Graham's number is so large it cannot be computed or stored
// It's defined using Knuth's up-arrow notation and towers of exponents
// We'll have to use a much smaller approximation or explain why it's impossible

console.log("🚀 Attempting Collatz conjecture on Graham's Number...\n");

console.log("❌ COMPUTATIONAL IMPOSSIBILITY DETECTED!");
console.log("=".repeat(80));

console.log("\n🔢 About Graham's Number:");
console.log("• Graham's number is so large it cannot be written in decimal notation");
console.log("• It would require more digits than there are atoms in the observable universe");
console.log("• Even storing just the NUMBER OF DIGITS would be impossible");
console.log("• It's defined using Knuth's up-arrow notation with massive towers");

console.log("\n📊 Scale Comparison:");
console.log("• Googol (10^100): 101 digits");
console.log("• Googolplex (10^googol): 10^100 + 1 digits");  
console.log("• Graham's Number: Incomparably larger than both");

console.log("\n🧮 Why This Is Impossible:");
console.log("• JavaScript's BigInt can handle very large numbers, but not infinite precision");
console.log("• Graham's number exceeds any possible computer representation");
console.log("• The universe doesn't contain enough matter to store this number");

console.log("\n🤔 Theoretical Analysis:");
console.log("• IF Graham's number could be computed...");
console.log("• Since it's odd (ends in 3), the first step would be: G×3+1");
console.log("• This would create an even larger number");
console.log("• The Collatz conjecture predicts it would eventually reach 1");
console.log("• But the number of steps would be astronomical");

console.log("\n🎯 Let's try a smaller 'Graham-inspired' number instead:");
console.log("Using 3↑↑↑3 = 3^(3^3) = 3^27 = 7,625,597,484,987");

// Let's use 3^27 as a Graham's-inspired number
const grahamInspired = BigInt(3) ** BigInt(27);

console.log(`\n📈 Computing Collatz for 3^27 = ${grahamInspired}`);
console.log(`This number has ${grahamInspired.toString().length} digits`);

// Now run Collatz on this much smaller but still large number
function findCollatzLoop(n) {
  const seen = new Map();
  let current = BigInt(n);
  let step = 0;
  let maxValue = current;
  
  while (true) {
    if (current > maxValue) maxValue = current;
    
    if (seen.has(current.toString())) {
      const loopStart = seen.get(current.toString());
      return {
        loopDetected: true,
        loopStart: loopStart,
        loopLength: step - loopStart,
        loopValue: current.toString(),
        totalSteps: step,
        maxValue: maxValue.toString()
      };
    }
    
    seen.set(current.toString(), step);
    
    if (step <= 10 || step % 100 === 0) {
      const digits = current.toString().length;
      const preview = digits > 30 ? 
        `${current.toString().slice(0, 10)}...${current.toString().slice(-10)} (${digits} digits)` : 
        current.toString();
      console.log(`Step ${step}: ${preview}`);
    }
    
    if (current === 1n) {
      console.log(`\n✅ REACHED 1 at step ${step}!`);
      return {
        loopDetected: true,
        loopStart: step,
        loopLength: 3,
        loopValue: "1",
        totalSteps: step,
        maxValue: maxValue.toString()
      };
    }
    
    if (current % 2n === 0n) {
      current = current / 2n;
    } else {
      current = current * 3n + 1n;
    }
    
    step++;
    
    if (step > 2000) {
      console.log(`\n⚠️ Stopped at ${step} steps for computational limits`);
      return {
        loopDetected: false,
        totalSteps: step,
        finalValue: current.toString(),
        maxValue: maxValue.toString()
      };
    }
  }
}

const result = findCollatzLoop(grahamInspired);

console.log("\n" + "=".repeat(60));
console.log("🎯 RESULTS FOR GRAHAM-INSPIRED NUMBER (3^27)");
console.log("=".repeat(60));

if (result.loopDetected && result.loopValue === "1") {
  console.log(`✅ Even 3^27 reaches the standard loop!`);
  console.log(`📊 Steps taken: ${result.totalSteps}`);
  console.log(`🏆 This suggests even Graham's number would eventually reach 1`);
  console.log(`   (if we could somehow compute it)`);
} else {
  console.log(`⏱️ Computation incomplete after ${result.totalSteps} steps`);
}

console.log("\n💭 CONCLUSION ABOUT ACTUAL GRAHAM'S NUMBER:");
console.log("• Mathematically: Would likely follow Collatz conjecture");
console.log("• Practically: Impossible to verify computationally");
console.log("• The number of steps would be unimaginably vast");
console.log("• But theoretically, it should still end up at 1 → 4 → 2 → 1");
