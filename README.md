# Tiny Stack VM

[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![Rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/mizuseii/tiny-stack-vm-01-run-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![Reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/mizuseii/tiny-stack-vm-01-run-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A [make.fun](https://make.fun) bounty entry: a tiny stack virtual machine for
make.fun's tiny stack ISA v1. `main.ts` (Node 22, no dependencies) runs every
instance under `/input/<id>/` — `program.bin` plus `input.bin` — and writes
`/output/<id>/stdout.bin` and `/output/<id>/exit.txt` for each.

Faithful to the kit's reference VM: wrapping 32-bit arithmetic, 256-value
stack, 64-deep call stack, 256 words of memory, and all ten traps with their
own exit codes (underflow 2, overflow 3, division by zero 4, bad opcode 5,
bad memory address 6, call depth 7, empty return 8, bad pc 9, step limit 10,
output limit 11), plus the 1,000,000-step and 65,536-byte output limits.
Deterministic: two runs write identical bytes.

Local run on the practice set:

```sh
MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts
```

Practice score: **1,000,000** (40/40 instances, stdout and exit code exact).

## License

MIT — see [LICENSE](LICENSE).
