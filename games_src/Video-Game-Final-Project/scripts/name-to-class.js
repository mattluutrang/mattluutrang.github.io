// Factory function:
// returns the object based on the name given
function nameToClass(name, x, y) {
    if (name == "stick") {
        return new Stick(x, y);
    }
    if (name == "stone") {
        return new Stone(x, y);
    }
    if (name == "sword") {
        return new Sword(x, y);
    }
}