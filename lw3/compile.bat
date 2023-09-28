set lws="task1"
(for %%p in (%lws%) do (
  cd %%p
  call compile.bat
  cd ..
))