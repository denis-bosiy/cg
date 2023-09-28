set lws="lw1" "lw2" "lw3"
(for %%p in (%lws%) do (
  cd %%p
  call compile.bat
  cd ..
))