export function capitalize(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createGroups(arr, numGroups)
{
    const perGroup = Math.ceil(arr.length / numGroups);
    return new Array(numGroups)
        .fill('')
        .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
}

export function cssVariables(node, variables)
{
    setCssVariables(node, variables);

    return {
        update(variables)
        {
            setCssVariables(node, variables);
        }
    }
}
export function setCssVariables(node, variables)
{
    for (const name in variables)
    {
        node.style.setProperty(`--${name}`, variables[name]);
    }
}

export function changeCssVariable(property, value)
{
    document.documentElement.style.setProperty(`--${property}`, value);
}