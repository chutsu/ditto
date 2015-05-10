# Why use ditto?

Docs are ugly and hard, period. We've all heard that too much comments is a bad
thing, because your code should be simple and readable enough that I should be
able to understand your design decisions with ease, and yet the most code
documentation is in the code itself, this leads to huge comment blocks where
the programmer probably spends more time scrolling then reading actual code.
This has been discussed by Jeff Atwood's ["Coding Without Comments"][1], where
his article opens with:

> If peppering your code with lots of comments is good, then having zillions of
> comments in your code must be great, right? Not quite. Excess is one way good
> comments go bad:

    '*************************************************
    ' Name: CopyString
    '
    ' Purpose: This routine copies a string from the source
    ' string (source) to the target string (target).
    '
    ' Algorithm: It gets the length of "source" and then copies each
    ' character, one at a time, into "target". It uses
    ' the loop index as an array index into both "source"
    ' and "target" and increments the loop/array index
    ' after each character is copied.
    '
    ' Inputs: input The string to be copied
    '
    ' Outputs: output The string to receive the copy of "input"
    '
    ' Interface Assumptions: None
    '
    ' Modification History: None
    '
    ' Author: Dwight K. Coder
    ' Date Created: 10/1/04
    ' Phone: (555) 222-2255
    ' SSN: 111-22-3333
    ' Eye Color: Green
    ' Maiden Name: None
    ' Blood Type: AB-
    ' Mother's Maiden Name: None
    ' Favorite Car: Pontiac Aztek
    ' Personalized License Plate: "Tek-ie"
    '*************************************************

Other examples include:

**Java - Javadoc**

    /**
    * Short one line description.                           (1)
    * <p>
    * Longer description. If there were any, it would be    [2]
    * here.
    * <p>
    * And even more explanations to follow in consecutive
    * paragraphs separated by HTML paragraph breaks.
    *
    * @param  variable Description text text text.          (3)
    * @return Description text text text.
    */
    public int methodName (...) {
        // method body with a return statement
    }

**C++ - Doxygen**

    //!  A test class.
    /*!
    A more elaborate class description.
    */
    class Test
    {
    public:
        //! An enum.
        /*! More detailed enum description. */
        enum TEnum {
                    TVal1, /*!< Enum value TVal1. */
                    TVal2, /*!< Enum value TVal2. */
                    TVal3  /*!< Enum value TVal3. */
                }
            //! Enum pointer.
            /*! Details. */
            *enumPtr,
            //! Enum variable.
            /*! Details. */
            enumVar;

        //! A constructor.
        /*!
        A more elaborate description of the constructor.
        */
        Test();
        //! A destructor.
        /*!
        A more elaborate description of the destructor.
        */
    ~Test();

        //! A normal member taking two arguments and returning an integer value.
        /*!
        \param a an integer argument.
        \param s a constant character pointer.
        \return The test results
        \sa Test(), ~Test(), testMeToo() and publicVar()
        */
        int testMe(int a,const char *s);

        //! A pure virtual member.
        /*!
        \sa testMe()
        \param c1 the first argument.
        \param c2 the second argument.
        */
        virtual void testMeToo(char c1,char c2) = 0;

        //! A public variable.
        /*!
        Details.
        */
        int publicVar;

        //! A function variable.
        /*!
        Details.
        */
        int (*handler)(int a,int b);
    };

**Python - Sphinx**

    def func(foo):

        """This function translates foo into bar

        :param foo: A string to be converted
        :returns: A bar formatted string
        """

And yet nothing much as changed in terms of documentation generation, worst yet
it is being encouraged by the likes of [Docco][2]. That produce annotated
sources like [this][3]. While it is beautiful on the rendered html, that is
still not the answer to good documentation IMHO. I personally find that
documentation in code just gets in the way of programming, it is an eye sore to
look at needless comments, that it can actually slow down your productivity,
because you have to scroll down to the relevant function.

Instead of this:


    /**
     * Square root of n with Newton-Raphson approximation
     *
     * @param n some number
     */
    private double SquareRootApproximation(n) {
        r = n / 2;

        // go though each abs(r - (n/r)) until its bigger than t
        while ( abs( r - (n/r) ) > t ) {
            r = 0.5 * ( r + (n/r) );  // calcuate a new r
        }
    }
    System.out.println( "r = " + r );  // print the final r value


Would you not want to refactor the above code and work with this?:


    private double SquareRootApproximation(n) {
        r = n / 2;
        while ( abs( r - (n/r) ) > t ) {
            r = 0.5 * ( r + (n/r) );
        }
        return r;
    }
    System.out.println( "r = " + SquareRootApproximation(r) );

This is the major reason why I've created `ditto`, I think markdown files are
the easiest way to have both the source and documentation side by side, so that
programmers can either focus on code or generate documentation or both without
being slowed down, and I hope you like it :)


[1]: http://blog.codinghorror.com/coding-without-comments/
[2]: http://jashkenas.github.io/docco/
[3]: http://backbonejs.org/docs/backbone.html
