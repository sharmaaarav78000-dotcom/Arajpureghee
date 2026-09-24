while true; do
  if ! pgrep -f "vite build" > /dev/null; then
    break
  fi
  sleep 1
done
