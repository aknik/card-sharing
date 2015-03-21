# card-sharing

### Responsibility warning

Author and contributors aren't responsable for content provided by supported
sources, as neither on how you will use this software's output.

This software isn't illegal at all, it just checks up a couple of free card
sharing servers sites, copies their provided public configuration and manages it
so it prints how you would do, plain text lines or other kind.

Card sharing is illegal on some countries, please check up on yours.

By installing and/or using this software you agree with GPL v3 license and also
with this responsibility warning.

### Installing

```bash
npm -g i card-sharing
```

### Usage

By default `card-sharing` will parse all sources and output in `plain-lines`.

```bash
card-sharing
```

Althrough you could select: which sources to fetch/parse and which output you
prefer.

##### saving output into a file

```bash
card-sharing > /path/to/your/file
```

##### choosing other output

```bash
card-sharing --output oscam-readers > /path/to/your/oscam/readers.conf
```

### Contributing

Please feel free to PR your bugfixes, enhancements or submit bug info, feature
requests and sort of.
