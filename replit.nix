{ pkgs }: {
    deps = [
        pkgs.sqlite.bin
        pkgs.nodejs-16_x
        pkgs.cowsay
    ];
}