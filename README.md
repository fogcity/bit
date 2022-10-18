# torch

GPU accelerated package for scientific computing and machine learning with JavaScript

## Design principles

`Be JavaScript`
Data scientists are familiar with the JavaScript language, its programming model, and its
tools. torch should be a first-class member of that ecosystem. It follows the commonly established
design goals of keeping interfaces simple and consistent, ideally with one idiomatic way of doing
things. It also integrates naturally with standard plotting, debugging, and data processing tools.
`Put researchers first`
torch strives to make writing models, data loaders, and optimizers as
easy and productive as possible. The complexity inherent to machine learning should be handled
internally by the torch library and hidden behind intuitive APIs free of side-effects and unexpected performance cliffs.
`Provide pragmatic performance`
To be useful, torch needs to deliver compelling performance,
although not at the expense of simplicity and ease of use. Trading 10% of speed for a significantly
simpler to use model is acceptable; 100% is not. Therefore, its implementation accepts added
complexity in order to deliver that performance. Additionally, providing tools that allow researchers
to manually control the execution of their code will empower them to find their own performance
improvements independent of those that the library provides automatically.

## Usability centric design

1.Deep learning models are just JavaScript programs
2.Interoperability and extensibility
3.Automatic differentiation
