# Override Bench

Understanding Apex override behavior can be difficult. To try and understand this better this repo contains a set of tests that compare actual behavior against expected outcomes so that we can capture what happens in practice, be that errors during deployment or cases where overrides are not effective.

To run the tests use

    npm run all

All the tests should pass. To review the expected outcome for each case you can review the details in benchtests/\*.ts or continue reading for a summary of the findings against API v61.

## Virtual, abstract and override keyword use

A class that is to be extended by another class must either use the virtual or abstract modifiers in its declaration. In most cases you will also need to declare the base method as virtual or abstract as appropriate and the super class method as an override.

There is an exception to this when you override a private method on a base class which is in a different cls file from the overriding method. The exception is allowed irrespective of the visibility of the super class method. For virtual methods you can omit both the virtual and override modifiers and the override can work (continue reading for more issues if you do this). For abstract methods you must use the abstract modifier on the base class method but can omit the override modifier.

Note that if you do use virtual on the base class method you must use override on the super class method.

## Visibility reduction

As a general rule, a super class method that is overriding a base method can not reduce the visibility of that method, e.g. a protected super class method can not override a public base class method. An exception here is that a global base class method can be overridden by a public super class method. It feels reasonable here to assume global and public are equivalents in this context, the choice is only important for package access.

## V61 Changes

At API v61 a change was introduced that specifically targets private method overrides, see
Update the API Version of Abstract or Virtual Classes to Prevent Overriding Private Methods. This explains that ‘private methods are no longer overridden by an instance method with the same signature in a subclass.’ The nature of this change is more complex than it appears as we see different behaviour between methods that use the private modifiers (explicitly private methods) and those that don’t have any modifier, which should be considered private by default (implicitly private methods).

For virtual base methods, implicitly private methods can be overridden but explicitly private methods can not (i.e. the base method is called). This behaviour holds in all cases considered, such as the override being in the same cls file and with or without virtual/override keywords (see above).

For abstract methods you are not allowed to use the override keyword if the base method is private (implicit or explicit style) and the base and super method are in different files. In the cases where the override keyword may then be omitted we see implicitly private methods allow overriding but explicitly private methods result in a GACK.

## Simulation

Alongside the tests that confirm org behavior matches the expected behavior a simulation of the logic needed to determine correct outcomes is included in benchtests/simulate.ts. When run this test confirms the same outputs are generated for the same test cases.
