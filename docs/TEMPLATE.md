# Next.js + shadcn/ui テンプレート

このリポジトリは、Next.js（App Router）と shadcn/ui を使用したダッシュボードテンプレートです。

## 概要

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (コンポーネントライブラリ)
- **next-themes** (ダークモード対応)
- **pnpm** (パッケージマネージャー)

## ベースライン

- **タグ/リリース**: `template-v1`

## 新規プロジェクト作成手順

### GitHub UI を使用する場合

1. このリポジトリの「**Use this template**」ボタンをクリック
2. 「**Create a new repository**」を選択
3. リポジトリ名を入力して作成
4. ローカルにクローン
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```
5. 依存関係をインストール
   ```bash
   pnpm install
   ```
6. 開発サーバーを起動
   ```bash
   pnpm dev
   ```

### CLI を使用する場合（GitHub CLIが必要）

```bash
gh repo create <your-repo-name> --template yujik427/next-shadcn-template --public
git clone <your-repo-url>
cd <your-repo-name>
pnpm install
pnpm dev
```

## 起動/動作確認

### 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 主要なページ

#### `/dashboard`
- ダッシュボードページ
- KPIカード、チャート、最近のアクティビティを表示

#### `/reports`
- OTCリサーチレポート一覧ページ
- `reports/`ディレクトリ内のMarkdownファイルを一覧表示

**テスト用Markdownファイルの作成例**:
```bash
mkdir -p reports
cat > reports/2024-01-15_group1.md << 'EOF'
# テストレポート

これはテスト用のレポートです。

## 内容
- 項目1
- 項目2

## まとめ
正常に動作しています。
EOF
```

#### `/reports/[slug]`
- レポート詳細ページ
- 指定されたMarkdownファイルの内容を表示

## どこから編集するか（開発の起点）

### ページの編集

- **`app/dashboard/*`** - ダッシュボード関連のページ
  - `app/dashboard/page.tsx` - ダッシュボードトップページ
  - `app/dashboard/layout.tsx` - ダッシュボードレイアウト

- **`app/reports/*`** - レポート関連のページ
  - `app/reports/page.tsx` - レポート一覧ページ
  - `app/reports/[slug]/page.tsx` - レポート詳細ページ
  - `app/reports/layout.tsx` - レポートレイアウト

### コンポーネントの編集

- **`components/dashboard/*`** - ダッシュボード用コンポーネント
  - `components/dashboard/header.tsx` - ヘッダー
  - `components/dashboard/sidebar.tsx` - サイドバー
  - `components/dashboard/kpi-cards.tsx` - KPIカード
  - `components/dashboard/overview-chart.tsx` - チャート
  - `components/dashboard/recent-activity.tsx` - 最近のアクティビティ

- **`components/ui/*`** - shadcn/ui コンポーネント
  - ⚠️ **注意**: これらのファイルは手動で編集しないでください
  - 新しいコンポーネントが必要な場合は `pnpm dlx shadcn@latest add XXX` を使用

- **`components/theme-provider.tsx`** - テーマプロバイダー
  - ダークモード対応の設定

### ユーティリティ

- **`lib/utils.ts`** - ユーティリティ関数
  - `cn()` 関数（クラス名のマージ）

## shadcn/ui の使用方法

⚠️ **重要**: shadcn/ui コンポーネントは手書きで追加しないでください。

### 新しいコンポーネントを追加する

```bash
pnpm dlx shadcn@latest add <component-name>
```

例:
```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add toast
pnpm dlx shadcn@latest add select
```

### 既存のコンポーネントを更新する

```bash
pnpm dlx shadcn@latest add <component-name> --overwrite
```

### 利用可能なコンポーネント

[shadcn/ui コンポーネント一覧](https://ui.shadcn.com/docs/components)

## ディレクトリ構造

```
.
├── app/                    # Next.js App Router
│   ├── dashboard/         # ダッシュボードページ
│   ├── reports/           # レポートページ
│   ├── globals.css        # グローバルスタイル
│   └── layout.tsx         # ルートレイアウト
├── components/            # Reactコンポーネント
│   ├── dashboard/         # ダッシュボード用コンポーネント
│   ├── ui/                # shadcn/ui コンポーネント
│   └── theme-provider.tsx # テーマプロバイダー
├── lib/                   # ユーティリティ
│   └── utils.ts           # 共通関数
├── reports/               # レポートMarkdownファイル
│   └── *.md               # レポートファイル
└── docs/                  # ドキュメント
    └── TEMPLATE.md        # このファイル
```

## テーマカスタマイズ

テーマは `app/globals.css` で定義されています。

- カラースキーム: Neutral
- ダークモード対応: あり
- CSS変数ベースのテーマシステム

## トラブルシューティング

### エラー: Module not found

新しい shadcn/ui コンポーネントが必要な場合:
```bash
pnpm dlx shadcn@latest add <component-name>
```

### エラー: Can't resolve 'XXX'

依存関係を再インストール:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-themes Documentation](https://github.com/pacocoursey/next-themes)


