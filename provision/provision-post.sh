#!/usr/bin/env bash

set -ex

# リポジトリルートのut.dumpをVM上のpostgresに読み込む
#cd /vagrant && sudo -u postgres psql -h localhost -U ut -d ut < ut.dump

# 二重に読み込まないように一度消去する
cd /vagrant && sudo -u postgres dropdb ut && sudo -u postgres createdb ut && sudo -u postgres psql -h localhost -U ut -d ut < ut.dump
