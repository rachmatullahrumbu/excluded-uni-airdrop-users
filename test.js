// Libraries
const { exec } = require("child_process");

// There is one single test here that takes a lot of time,
// so we must set a high timeout threshold.
jest.setTimeout(1000000);

describe("Given all of the known accounts to interact with Uniswap", () => {
    describe("and all of the proposed accounts from projects in this repo", () => {
        test("every proposed account is also in the set of known accounts", async () => {
            const scriptOutput = await new Promise((accept, reject) => {
                exec("./scripts/compare_addresses", (err, stdout, stderr) => {
                    if (err) {
                        reject(stderr);
                    }

                    accept(stdout);
                });
            });

            const invalidAccounts = scriptOutput.trim().split("\n");

            // If there is no output, then every line matched valid accounts.
            expect(invalidAccounts).toEqual([]);
        });
    });
});
