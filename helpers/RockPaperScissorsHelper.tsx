

export default class RockPaperScissorsHelper {
    static translateDecisions(number: number){
        switch (number){
            case 1:
                return "rock";
            case 2:
                return "paper";
            case 3:
                return "scissors";
        }
    }

    static calculateResult(userDecision: string, cpuDecision: string): any{
        if (userDecision === "rock" && cpuDecision === "rock" || userDecision === "scissors" && cpuDecision === "scissors" || userDecision === "paper" && cpuDecision === "paper") {
            return {header: "Tie!", color: "#B4BC11"};
        }
        if (userDecision === "rock" && cpuDecision === "scissors" || userDecision === "scissors" && cpuDecision === "paper" || userDecision === "paper" && cpuDecision === "rock") {
            return {header: "You Win!", color: "#2CE231"};
        }
        if (cpuDecision === "rock" && userDecision === "scissors" || cpuDecision === "scissors" && userDecision === "paper" || cpuDecision === "paper" && userDecision === "rock") {
            return {header: "CPU Wins!", color: "#E22C2C"};
        }
    }
}