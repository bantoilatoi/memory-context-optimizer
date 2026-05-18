# Compress logs while preserving exact errors and identifiers

"
"

<!-- Generated from commands/class names
- Exception types
- Config structure

Compress:
- Duplicate stack traces (keep first 5 frames + count)
- Repeated patterns (first + "[repeated Nx]")
- Verbose timestamps (keep if order-critical)
- Excess whitespace
- Redundant headers

Examples:
Stack trace:
  Error at foo (file.js:42)
  at bar (file.js:100)
  [5 more frames]

Repeated lines:
  Line 1
  [Line 2-10 repeated 9x]
"""
 -->
