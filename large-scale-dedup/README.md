Home assignment 1 - large scale dedup
Given an input text file, named input.txt, that contains 5,000,000 (5 million lines), each line contains up to 1,000 characters (in pure ASCII), create an output file, named output.txt, so that it contains only unique text lines, not necessarily in the original order.

Limitation:
Pure code
Single machine, with:
1 CPU
1 GB of RAM
500 GB of disk size

Solution #1:

1. chunk and sort: Create 100 sorted 1GB files. (Duplicates are still in them).
2. 2-way merge: for each pair of file, read each line in parallel and compare.
   insert min(lineA, lineB), move forward the corresponding fileHandler and save
   lastInsertedLine. continue until there is only 1 file.
   OR
   k-way-merge: insert 100 lines to min heap. pop and compare to lastInsertedLine
   insert min(lineA, lineB), move forward the corresponding fileHandler and save.

time complexity: O(n\*logn)

Solution #2 (better):

1. iterate input.txt line by line:
   insert each line to hash function - the output will be from 1 to k
   which k is the number of temp output files we create.
   - note that the size of the output file should be less than 1GB
     because in the next step we want to remove duplicate with SET.  
     at this point it's guaranteed each file contains unique duplicate lines!
     mean all "aaa" goes to the same files etc..
     ["aaa", "bbb", "bbb", "aaa"] -> output1, ["ccc", "ddd", "ccc"] -> output2...
2. iterate each output file line by line:
   insert each line to SET
   at the end, write the data in SET to output file

how many output files we need to create?
worst case scenario: all lines are identical
5,000,000 lines \* 1,000 characters =
time complexity: O(n)

Fixes:

- fix import of "\*"
- decide which library to use
  To use the promise-based APIs:

import \* as fs from 'node:fs/promises';
To use the callback and sync APIs:

import \* as fs from 'node:fs';
