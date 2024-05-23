## Planning notes
This page is just for me to jot down half-baked ideas on how I want to do this, this is not a guide or anything comprehensive. Just a place for me to stash notes 

Basic Path ideas

- First: Predict next states (Flood-fill)
- Immediate collision: Highest Priority
  - If win attempt ? increase path points : (collision with self or wall? prune tree : lower path ranking)
- Determine response action/choose A* target
  - If food level is too low, target the closest fruit
  - If path count is too low, target survival
  - If # of players is too large or a player is larger, target movement away


Ranking Points (should include a multiplier), select and choose using minimax and alpha beta pruning 
- (-100) Touches larger snake head
- (+50) Touches fruit and is hungry  














Other out-there ideas
 - Cache recent future moves as hashes and look them up again to speed up REST API
 - Dynamic steps count (time self & check previous request latency to increase future pathing count to fit within time count or return early if stuck)

