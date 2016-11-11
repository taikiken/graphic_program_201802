# React

## タグの作成
新規コードでは現在 deprecated になった `React.createClass` の使用を止めます。

代わりに `React.Component` を継承した class を作成します

@example

```
const Reacr = self.React;

export class ComponentExample extends React.Component {
    get propTypes() {
        return {
            index: React.PropTypes.number.isRequired,
            flag: React.PropTypes.bool.isRequired,
            calkback: React.PropTypes.func.isRequired
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            flag: props.flag
        };
    }
    componentDidmount() {
        // タグ生成後の処理
    }
    render() {
        return (
            <div className="example" />
        );
    }
}
```

- 拡張子

`.jsx` 推奨,
 `.js` 可

- 名称

接頭詞に `Component` 使用推奨

@example
```
export class ComponentVideoPlayer extends React.Component {}
export class ComponentSinglesArticle extends React.Component {}
```

- 階層  
それぞれ以下の階層の任意の位置に配置します
    - desktop
    `babels/src/component`
    - mobile
    `babels/src/sp/component`
    
## Component 作成

推奨： 関数の順序

下記を参考に記述をお願いします、既に記述分は修正の必要はありません。

参照: [Airbnb React/JSX Style Guide: Ordering](https://github.com/airbnb/javascript/tree/master/react#ordering)

<pre>
optional static methods
constructor
getChildContext
componentWillMount
componentDidMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
getter methods for render like getSelectReason() or getFooterContent()
optional render methods like renderNavigation() or renderProfilePicture()
render
</pre>

## 記述 Element の参照を取得する

【非推奨】(deprecated)
```
componentDidmount() {
    const element = this.refs.exampleElement;
    const paragrapg = document.querySelector('p.example-paragraph');
}
render() {
    return (
        return (
            <div className="example" ref="exampleElement">
                <p className="example-paragraph" />
            </div>
        );
    );
}
```

`this.refs.` 参照を利用し出力 Element の参照を取得するのは「非推奨」になったので新規コードでは使用しません。

`querySelector`, `getElementById`... などでのアクセスは元々 **非推奨** です。

【推奨】
```
constructor(
    this.element = null;
    this.paragaraph = null;
)
componentDidmount() {
    const element = this.element;
    const paragrapg = this.paragaraph;
}
render() {
    return (
        return (
            <div className="example" ref={(component) => {
                this.element = component;
            }}>
                <p className="example-paragraph" ref={(component) => {
                    this.paragaraph = component;
                }} />
            </div>
        );
    );
}
```

## style の設定

jQuery での設定や Element style プロパティを使用しての設定は破壊的行為として **非推奨** です。

【非推奨】
```
componentDidmount（）{
    this.hide();
}
hide() {
    $(this.element).hide();
    // or
    this.element.style.cssText = 'display: none;';
}
```

【推奨】
```
constructor(props) {
    super(props);
    this.state = {
        display: 'block'
    };
}
componentDidmount（）{
    this.hide();
}
hide() {
    this.setState({ display: none });
}
render() {
    return (
        <div
            className="example"
            ref={(component) => {
                this.element = component;
            }}
            style={{ display: this.state.display }}
        >
            <p />
        </div>
    );
}
```
state プロパティを使用します。

## event handler

click 設定
```
constructor(props) {
    super(props);
    this.boundClick = this.clickHandler.bind(this);
}
clickHandler(event) {
    event.preventDefault();
}
render() {
    return (
        <a href="#exaple" onClick={this.boundClick}>
            クリック
        </a>
    );
}
```

属性 `onClick` (`C`大文字)へ bind 済み関数を設定します 

