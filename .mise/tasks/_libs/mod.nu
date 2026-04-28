def type [cmd] {
  return (0 < (which $cmd | length))
}

export def --wrapped container [ ...args ] {
  podman ...$args
}
